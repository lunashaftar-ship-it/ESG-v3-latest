import Footer from '@/components/landing/footer'
import { actualReports, projectedReports, BASELINE_EMISSIONS } from '@/lib/progress-data'

export const metadata = {
  title: 'Progress Reports — NordaGroup',
  description: 'Annual ESG progress reports and projected pathway to carbon neutrality by 2030.',
}

export default function ProgressPage() {
  return (
    <>
      <main className="mt-header min-h-screen bg-white">
        <section className="border-b border-neutral-100 px-4 sm:px-6 py-12 sm:py-16 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 mb-4">
              Sustainability Reporting
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950 mb-4">
              Annual Progress Reports
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl">
              Actual year-by-year data and our forward-looking pathway toward full carbon
              neutrality by 2030. All figures independently verified against GRI Standards.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-10 sm:py-12 lg:px-16 border-b border-neutral-100">
          <div className="flex items-center gap-4 mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400 whitespace-nowrap">
              Actual annual reports
            </p>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {actualReports.filter((r) => r.published).map((report) => {
              const reduction = Math.round(
                ((BASELINE_EMISSIONS - report.totalEmissionsMt) / BASELINE_EMISSIONS) * 100
              )

              return (
                <div key={report.year} className="border border-neutral-200 rounded-xl p-4 sm:p-5">
                  <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded-full mb-4">
                    Actual
                  </span>

                  <div className="text-xl sm:text-2xl font-semibold text-neutral-950 mb-1">
                    {report.year}
                  </div>

                  <div className="text-sm font-medium text-green-700 mb-1">
                    {report.totalEmissionsMt} Mt
                  </div>

                  <div className="text-xs text-neutral-400 mb-3">
                    {reduction}% below 2015
                  </div>

                  <div className="text-xs text-neutral-500 leading-relaxed">
                    {report.summary}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="px-4 sm:px-6 py-10 sm:py-12 lg:px-16">
          <div className="flex items-center gap-4 mb-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400 whitespace-nowrap">
              Projected pathway
            </p>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          <p className="text-xs text-neutral-400 mb-8 italic">
            Forward-looking projections based on current plans. Actual results may differ.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projectedReports.filter((r) => r.published).map((report) => (
              <div key={report.year} className="border border-blue-100 rounded-xl p-4 sm:p-5">
                <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mb-4">
                  Projected
                </span>

                <div className="text-xl sm:text-2xl font-semibold text-neutral-950 mb-1">
                  {report.year}
                </div>

                <div className="text-sm font-medium text-blue-700 mb-1">
                  {report.projectedEmissionsMt} Mt
                </div>

                <div className="text-xs text-neutral-400 mb-3">
                  {report.reductionVs2015}
                </div>

                <div className="text-xs text-neutral-500 leading-relaxed">
                  {report.summary}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}