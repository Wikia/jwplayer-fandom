import { createContext, useContext } from 'react';

type MobileArticleVideoContextType = {
	scrollTopPosition?: string;
};

export const MobileArticleVideoContext = createContext<MobileArticleVideoContextType>({});

export const useMobileArticleVideoContext = () => {
	return useContext(MobileArticleVideoContext);
};
