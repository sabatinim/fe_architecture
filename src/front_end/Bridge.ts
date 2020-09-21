const ExecuteABTest = () => Math.floor(Math.random() * 2) + 1;

export const bridgeWith = (aComponent: JSX.Element, anotherComponent: any) =>
    () => {
        if (ExecuteABTest() == 1) {
            return aComponent
        } else
            return anotherComponent
    }
