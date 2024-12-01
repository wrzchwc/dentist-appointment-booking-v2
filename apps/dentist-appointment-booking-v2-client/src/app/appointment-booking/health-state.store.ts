import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { HealthStateDescriptor, HealthStatePayload, Info } from './model';
import { computed } from '@angular/core';

interface State {
  readonly descriptors: Record<string, HealthStatePayload>;
}

const initialState: State = {
  descriptors: {}
};

export const HealthStateStore = signalStore(
  withState(initialState),
  withComputed(({ descriptors }) => ({
    facts: computed<string[]>(() => Object.values(descriptors()).map(({ fact }) => fact)),
    infos: computed<Info[]>(() => Object.entries(descriptors()).map(([id, { additionalInfo }]) => ({ id, additionalInfo }))),
  })),
  withMethods((store) => ({
    storeDescriptor(descriptor: HealthStateDescriptor): void {
      patchState(store, ({ descriptors }) => ({
        descriptors: {
          ...descriptors,
          [descriptor.id]: descriptor.payload
        }
      }));
    },
    removeDescriptor(descriptorId: string): void {
      patchState(store, ({ descriptors }) => ({
        descriptors: Object.fromEntries(
          Object.entries(descriptors).filter(([key]) => key !== descriptorId)
        )
      }));
    },
    updateDescriptor(info: Info): void {
      patchState(store, ({ descriptors }) => ({
        descriptors: Object.fromEntries(
          Object.entries(descriptors).map(([key, value]) => {
            if (key === info.id) {
              return [key, { ...value, additionalInfo: info.additionalInfo }];
            }
            return [key, value];
          })
        )
      }));
    },
    clearWomenOnly(): void {
      patchState(store, ({ descriptors }) => ({
        descriptors: Object.fromEntries(
          Object.entries(descriptors).filter(([, { womenOnly }]) => !womenOnly)
        )
      }));
      console.log(Object.entries(store.descriptors()));
    }
  }))
);
