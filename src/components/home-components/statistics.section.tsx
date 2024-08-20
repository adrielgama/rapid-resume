import { Separator } from '../ui/separator'

const StatisticsItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <article className="flex flex-col items-center">
      <div className="text-2xl font-bold lg:text-4xl">{value}</div>
      <p className="text-dark-gray">{title}</p>
    </article>
  )
}

function StatisticsSection() {
  return (
    <section className="flex items-center justify-evenly space-x-4 py-16 text-sm text-dark-blue dark:text-white">
      <StatisticsItem title="CV created" value="300+" />
      <Separator orientation="vertical" className="h-8" />
      <StatisticsItem title="Rating" value="9.8" />
      <Separator orientation="vertical" className="h-8" />
      <StatisticsItem title="Users" value="100+" />
    </section>
  )
}

export default StatisticsSection
