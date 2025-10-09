interface Props {
    children: React.ReactNode
}
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { persistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ClerkProvider } from '@clerk/clerk-expo'
export default function ReduxWrapper({ children }: Props) {
    const clerk_key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
    return <>
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
                <ClerkProvider publishableKey={clerk_key}>


                    {children}
                </ClerkProvider>
            </PersistGate>
        </Provider>


    </>;
}