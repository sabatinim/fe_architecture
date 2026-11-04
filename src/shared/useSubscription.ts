import {DependencyList, useEffect} from "react";
import {Unsubscribe} from "./eventBus.js";

export function useSubscription(setup: () => Unsubscribe, deps: DependencyList): void {
    useEffect(() => {
        const unsubscribe = setup();

        return () => unsubscribe();
        
    }, deps);
}