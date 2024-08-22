export const SectionHeader = ({
  title,
  color,
}: {
  title: string
  color: string
}) => (
  <div className="flex items-center">
    <h3 className="mr-3 text-xl font-bold uppercase" style={{ color }}>
      {title}
    </h3>
    <div className="flex-1 border-t-2"></div>
  </div>
)
