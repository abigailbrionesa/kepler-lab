import { PLANET_DATA } from '@/lib/planet-data';
import Planet from './planet';

const Planets = () => {
  return (
    <>
      {PLANET_DATA.map((planet, index) => (
        <Planet
          key={index}
          model = {planet.name + "Model"}
          distance={planet.distanceFromSun}
          radius={planet.diameter / 2}
          ringColor={planet.color}
          name={planet.name}
          eccentricity={planet.orbitalEccentricity}
          inclination={planet.orbitalInclination}
          argumentPeriapsis={
            planet.longitudePerihelion - planet.longitudeAscendingNode
          }
          ascendingNode={planet.longitudeAscendingNode}
          meanAnomaly={planet.meanLongitude - planet.longitudePerihelion}
          orbitalPeriod={planet.orbitalPeriod}
          epoch={planet.epoch}
        />
))}
    </>
  );
};

export default Planets;
