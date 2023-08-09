import { FC, useMemo } from "react";
import { baseChartOptions } from "../../utils/baseChartOptions";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import style from "../../styles/components/lineChart.module.css";
import { Period } from "../../types/metrics/types";
import { PeriodToDifferenceLabel } from "../../utils/period";

interface LineChartProps {
  title: string;
  differenceInPercent?: number;
  period: Period;
  chartData: Array<ChartData> | undefined;
}

export const LineChart: FC<LineChartProps> = ({
  title,
  differenceInPercent,
  period,
  chartData,
}) => {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

  const MemoizedApexCharts = useMemo(() => {
    return ApexCharts;
  }, [ApexCharts]);

  const chartOptions = {
    ...baseChartOptions,
  };

  const differenceLabel = useMemo(() => {
    if (!differenceInPercent) {
      return `0`;
    }
    if (differenceInPercent > 0) {
      return `+${differenceInPercent}%`;
    } else {
      return `${differenceInPercent}%`;
    }
  }, [differenceInPercent]);

  const differenceLabelSuffix = useMemo(() => {
    const label = PeriodToDifferenceLabel[period];
    return `since ${label}`;
  }, [period]);

  const isPositive = useMemo(() => {
    if (!differenceInPercent) {
      return true;
    }
    return differenceInPercent > 0;
  }, [differenceInPercent]);

  return (
    <div className={`${style.card} py-5`}>
      <div className="flex flex-col justify-center items-start px-5 mb-5">
        <p className="text-medium font-bold">{title}</p>
        <div className="flex flex-row items-center mt-2">
          <p className={`${isPositive ? style.green : style.red} text-small`}>
            {differenceLabel}
          </p>
          <p className="text-micro ml-1">{differenceLabelSuffix}</p>
        </div>
      </div>
      <div className={style.chartWrapper}>
        {chartData ? (
          <MemoizedApexCharts
            options={chartOptions as ApexOptions}
            series={chartData as any}
            type="area"
            width="100%"
            height="100%"
          />
        ) : null}
      </div>
    </div>
  );
};
