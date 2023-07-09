import { FC, useMemo } from "react";
import helper from "../../styles/components/helper.module.css";
import { baseChartOptions } from "../../utils/baseChartOptions";
import { ApexOptions } from "apexcharts";
import { chartData } from "../../mock/chartData";
import dynamic from "next/dynamic";

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
    <div className="flex flex-col justify-center items-start w-full">
      <p>{title}</p>
      {subtitle && (
        <p>{subtitle}</p>
      )}
      <MemoizedApexCharts
        options={chartOptions as ApexOptions}
        series={chartData as any}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  )
}