import { ServiceDAO, UpdateServiceRequest } from '@dentist-appointment-booking-v2/shared/services';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ServicesApiService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

interface State {
  readonly services: ServiceDAO[];
}

const initialState: State = {
  services: []
};

export const ServicesStore = signalStore(
  withState(initialState),
  withMethods((
      store,
      servicesApiService = inject(ServicesApiService)
    ) => ({
      _fetchServices: rxMethod<void>(
        pipe(
          switchMap(() => servicesApiService.getServices()),
          tap((services) => patchState(store, { services }))
        )
      ),
      updateService(serviceId: string, request: UpdateServiceRequest): void {
        patchState(store, (state) => ({
            ...state,
            services: state.services.map((service) => {
                if (service.id !== serviceId) {
                  return service;
                }
                return {
                  ...service,
                  price: request.price
                };
              }
            )
          }
        ));
      }
    })
  ),
  withHooks({
    onInit(store) {
      store._fetchServices();
    }
  })
);
