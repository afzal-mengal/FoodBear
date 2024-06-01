import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: 'looking',
    handleChangeProgress: () => { }
});

export function UserProgressContextProvider({ children }) {
    const [userProgressState, setUserProgressState] = useState('looking');

    function handleChangeProgress(newProgress) {
        setUserProgressState(newProgress);
    }

    const modalContext = {
        progress: userProgressState,
        handleChangeProgress: handleChangeProgress
    }

    return (
        <UserProgressContext.Provider value={modalContext}>{children}</UserProgressContext.Provider>
    );
}

export default UserProgressContext;