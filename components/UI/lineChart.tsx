import { FC, useMemo } from "react";
import { baseChartOptions } from "../../utils/baseChartOptions";
import { ApexOptions } from "apexcharts";
import { chartData } from "../../mock/chartData";
import dynamic from "next/dynamic";
import style from "../../styles/components/lineChart.module.css"

interface LineChartProps {
  title: string;
  subtitle?: string;
}

export const LineChart: FC<LineChartProps> = ({ title, subtitle }) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

  const MemoizedApexCharts = useMemo(() => {
    return ApexCharts
  }, [ApexCharts]);
  
  const chartOptions = {
    ...baseChartOptions,
  }

  return (
    <div className={`${style.card} py-5`}>
      <div className="flex flex-col justify-center items-start px-5 mb-5">
        <p className="text-medium font-bold">{title}</p>
        {subtitle && (
          <p className="text-micro">{subtitle}</p>
        )}
      </div>
      <div className={style.chartWrapper}>
        <MemoizedApexCharts
          options={chartOptions as ApexOptions}
          series={chartData as any}
          type="area"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}