import { useSnackbar } from 'notistack';

export default () => {
    const { enqueueSnackbar } = useSnackbar();

    const notify = (message: string, variant: 'success' | 'error') => {
        enqueueSnackbar(message, { variant });
    };

    return { notify };
};
