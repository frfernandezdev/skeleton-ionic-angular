export interface CoreAppState {
  title: string;
  loader: boolean;
  drawer: boolean;
  overflowMenu: Element | null | undefined;
  snackbar: {
    open: boolean;
    message?: string | null;
    severity?: string | null;
  };
}

export const initialAppState = {
  title: 'Skeleton - App',
  loader: false,
  drawer: false,
  overflowMenu: null,
  snackbar: {
    open: false,
    message: null,
    severity: 'info',
  },
};
