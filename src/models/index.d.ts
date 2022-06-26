import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NoiseReadingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NoiseReading {
  readonly id: string;
  readonly lat?: number | null;
  readonly long?: number | null;
  readonly reading?: (number | null)[] | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NoiseReading, NoiseReadingMetaData>);
  static copyOf(source: NoiseReading, mutator: (draft: MutableModel<NoiseReading, NoiseReadingMetaData>) => MutableModel<NoiseReading, NoiseReadingMetaData> | void): NoiseReading;
}