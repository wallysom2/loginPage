import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

interface ReloadContextType {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ReloadContext = createContext<ReloadContextType>({
  reload: false,
  setReload: () => {},
});

interface ReloadProviderProps {
  children: ReactNode;
}

export function ReloadProvider({ children }: ReloadProviderProps) {
  const [reload, setReload] = useState(false);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      {children}
    </ReloadContext.Provider>
  );
}

export default ReloadContext;
