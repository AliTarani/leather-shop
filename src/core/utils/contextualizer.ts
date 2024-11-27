import React, { useContext } from "react";

enum ProvidedServices {}

const contexts = new Map<ProvidedServices, React.Context<any | undefined>>();

const contextualizer = {
  createContext: <T>(
    service: ProvidedServices
  ): React.Context<T | undefined> => {
    const context = React.createContext<T | undefined>(undefined);

    contexts.set(service, context);
    return context;
  },

  use: <T>(services: ProvidedServices): T => {
    const context = contexts.get(services);
    if (context === undefined) {
      throw new Error(`${ProvidedServices[services]} was not created`);
    }

    const service = useContext(context);
    if (service === undefined) {
      throw new Error(
        `You must use ${ProvidedServices[services]} from within its service`
      );
    }
    return service;
  },

  clear() {
    contexts.clear();
  },
};
export default contextualizer;
