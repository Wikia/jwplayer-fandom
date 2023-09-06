import React from 'react';
import Spinner from '@fandom-frontend/react-common/dist/components/Spinner';
import IconMovies from '@fandom-frontend/react-common/dist/icons/IconMovies';

import styles from './VideoPlaceholder.module.scss';

export const VideoPlaceholder = ({ isScrollPlayer }) => (
	<div className={isScrollPlayer ? styles.placeholderWrapperScrollPlayer : styles.placeholderWrapper}>
		<Spinner className={styles.spinner} />
		<div className={styles.placeholder}>
			<IconMovies />
		</div>
	</div>
);
