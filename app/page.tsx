function MainContent() {
  return (
    <div className="flex flex-1 flex-col">
      <div>site header</div>
      <div className="flex flex-1 relative">
        <div className="flex flex-1">
          <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center rounded-lg border border-dashed">
            <p className="text-lg text-muted-foreground">
              main content
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <MainContent />
  );
}
