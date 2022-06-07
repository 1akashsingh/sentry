import {OrganizationSummary, PageFilters} from 'sentry/types';
import {Series} from 'sentry/types/echarts';
import {TableData} from 'sentry/utils/discover/discoverQuery';

import {WidgetQuery, WidgetType} from '../types';

import {ErrorsAndTransactionsConfig} from './errorsAndTransactions';
import {IssuesConfig} from './issues';
import {ReleasesConfig} from './releases';

export type ConditionalProps = {
  organization?: OrganizationSummary;
  pageFilters?: PageFilters;
};

export interface DatasetConfig<SeriesResponse, TableResponse> {
  /**
   * Transforms timeseries API results into series data that is
   * ingestable by echarts for timeseries visualizations.
   */
  transformSeries?: (data: SeriesResponse) => Series[];
  /**
   * Transforms table API results into format that is used by
   * table and big number components
   */
  transformTable?: (
    data: TableResponse,
    widgetQuery: WidgetQuery,
    conditionalProps?: ConditionalProps
  ) => TableData;
}

export function getDatasetConfig<B extends WidgetType | undefined>(
  widgetType: B
): B extends WidgetType.ISSUE
  ? typeof IssuesConfig
  : B extends WidgetType.RELEASE
  ? typeof ReleasesConfig
  : typeof ErrorsAndTransactionsConfig;

export function getDatasetConfig(
  widgetType?: WidgetType
): typeof IssuesConfig | typeof ReleasesConfig | typeof ErrorsAndTransactionsConfig {
  switch (widgetType) {
    case WidgetType.ISSUE:
      return IssuesConfig;
    case WidgetType.RELEASE:
      return ReleasesConfig;
    case WidgetType.DISCOVER:
    default:
      return ErrorsAndTransactionsConfig;
  }
}
