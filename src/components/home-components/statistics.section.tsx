import { Separator } from '../ui/separator'

function StatisticsSection() {
  return (
    <section className="w-full py-16">
      <div className="ju container flex h-5 max-w-5xl items-center justify-evenly space-x-4 text-sm text-dark-blue dark:text-white">
        <StatisticsItem title="CV created" value="300+" />
        <Separator orientation="vertical" className="h-8" />
        <StatisticsItem title="Rating" value="9.8" />
        <Separator orientation="vertical" className="h-8" />
        <StatisticsItem title="Users" value="100+" />
      </div>
    </section>
  )
}

export const StatisticsItem = ({
  title,
  value,
}: {
  title: string
  value: string
}) => {
  return (
    <article className="flex flex-col items-center">
      <div className="text-2xl font-bold lg:text-4xl">{value}</div>
      <p className="text-dark-gray">{title}</p>
    </article>
  )
}

export default StatisticsSection
