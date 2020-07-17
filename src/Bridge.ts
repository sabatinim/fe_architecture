type ABTest = () => number;
let getNumberFrom0and1: ABTest = () => Math.floor(Math.random() * 2) + 1;


export let bridgeWith = (aComponent: JSX.Element, anotherComponent: any): () => JSX.Element =>
    () => {
        if (getNumberFrom0and1() == 1) {
            return aComponent
        } else
            return anotherComponent
    }
