import { Vector3 } from "three";
import { SCALE_FACTOR_ORBIT } from "./constants";

const pi = Math.PI;
const full_circle = 2 * pi

export function gregorian_to_julian(selected_date: Date): number {
    return selected_date.getTime() / 86400000 + 2440587.5;
}

export function normalize_radians(angle: number): number {
    let normalized = angle % (2 * pi);
    if (normalized < 0) normalized += (2 * pi);
    return normalized;
}

//radians
export function kepler_solve(eccentricity: number, mean_anomaly_at_selected_date: number, decimals: number): number {
    const maxIter = 30;
    let i = 0;
    const delta = Math.pow(10, -decimals);
    const normalized_mean_anomaly = normalize_radians(mean_anomaly_at_selected_date)
    let eccentric_anomaly: number, F: number;
    if (eccentricity < 0.8) eccentric_anomaly = normalized_mean_anomaly;
    else eccentric_anomaly = pi;
    F = eccentric_anomaly - eccentricity * Math.sin(normalized_mean_anomaly) - normalized_mean_anomaly;
    while (Math.abs(F) > delta && i < maxIter) {
        eccentric_anomaly = eccentric_anomaly - F / (1.0 - eccentricity * Math.cos(eccentric_anomaly));
        F = eccentric_anomaly - eccentricity * Math.sin(eccentric_anomaly) - normalized_mean_anomaly;
        i = i + 1;
    }
    return eccentric_anomaly
}

export const get_true_anom = (eccentricity: number, eccentric_anomaly: number, decimals: number): number => {
    const S = Math.sin(eccentric_anomaly);
    const C = Math.cos(eccentric_anomaly);
    const fak = Math.sqrt(1.0 - eccentricity * eccentricity);
    const phi = Math.atan2(fak * S, C - eccentricity);
    return Math.round(phi * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function get_position_at_selected_date(
    distance_from_sun: number, //kilometers
    eccentricity: number,
    mean_motion: number,
    inclination: number, //radians
    argument_of_periapsis: number, //radians,
    longitude_of_ascending_node: number, //radians
    mean_anomaly: number, //radians
    epoch: number, //julian date
    selected_date: Date, //gregorian date
): Vector3 {
    const time_since_epoch = gregorian_to_julian(selected_date) - epoch;
    const mean_anomaly_at_selected_date = mean_anomaly + (mean_motion * time_since_epoch)
    const eccentric_anomaly_at_selected_date = -kepler_solve(eccentricity, mean_anomaly_at_selected_date, 4);
    const true_anomaly_at_selected_date = get_true_anom(eccentricity, eccentric_anomaly_at_selected_date, 5);
    const coordinates = keplerian_to_cartesian_coords(distance_from_sun, eccentricity, inclination, argument_of_periapsis, longitude_of_ascending_node, true_anomaly_at_selected_date)
    return coordinates
}

export function get_orbit_points(
    distance_from_sun: number, //kilometers
    eccentricity: number,
    inclination: number, //radians
    argument_of_periapsis: number, //radians
    longitude_of_ascending_node: number //radians
): Vector3[] {
    const points: Vector3[] = [];
    const base_step = 0.1;
    const eccentricity_factor = Math.max(0.1, 1 - eccentricity);
    const step = base_step * eccentricity_factor;
    for (let true_anomaly = 0; true_anomaly < full_circle; true_anomaly += step) {
      const position = keplerian_to_cartesian_coords(distance_from_sun, eccentricity, inclination, argument_of_periapsis, longitude_of_ascending_node, true_anomaly);
      points.push(position);
    }
    const final_point = keplerian_to_cartesian_coords(distance_from_sun, eccentricity, inclination, argument_of_periapsis, longitude_of_ascending_node, 0);
    points.push(final_point);
    return points;
};

export function keplerian_to_cartesian_coords(
    distance_from_sun: number, //kilometers
    eccentricity: number,
    inclination: number, //radians
    argument_of_periapsis: number, //radians,
    longitude_of_ascending_node: number, //radians
    true_anomaly: number, //radians
): Vector3 {
    const orbital_radius = (distance_from_sun * (1 - eccentricity * eccentricity) / (1 - eccentricity * Math.cos(true_anomaly + pi)))
    // polar coordinates
    const x = orbital_radius * Math.cos(true_anomaly);
    const y = orbital_radius * Math.sin(true_anomaly);
    // periapsis (ω)
    const x1 = x * Math.cos(argument_of_periapsis) + y * Math.sin(argument_of_periapsis);
    const y1 = -x * Math.sin(argument_of_periapsis) + y * Math.cos(argument_of_periapsis);
    // rotation (i) 
    const z1 = y1 * Math.sin(inclination);
    const y2 = y1 * Math.cos(inclination);
    // ascending node (Ω)
    const x3 = x1 * Math.cos(longitude_of_ascending_node) + y2 * Math.sin(longitude_of_ascending_node);
    const y3 = -x1 * Math.sin(longitude_of_ascending_node) + y2 * Math.cos(longitude_of_ascending_node);
    return new Vector3(x3 * SCALE_FACTOR_ORBIT, z1 * SCALE_FACTOR_ORBIT, -y3 * SCALE_FACTOR_ORBIT)
}