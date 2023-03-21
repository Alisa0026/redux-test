import React, { useSyncExternalStore } from 'react'
import ReactReduxContext from "../ReactReduxContext"


// 用 useSyncExternalStore 来优化
function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext)

    const selectedField = useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState())
    )

    return selectedField
}

export default useSelector