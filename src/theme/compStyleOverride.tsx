import { Theme } from '@mui/material/styles';

export default function componentStyleOverrides(theme: Theme, borderRadius: number) {
    const mode = theme.palette.mode;

    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.dark,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    alignItems: 'center',
                    '&.MuiAlert-standardInfo': {
                        border: `1px solid ${theme.palette.info.light}30`,
                        borderWidth: mode === 'dark' ? 0 : 1,

                        '& .MuiAlert-icon': {
                            color: theme.palette.info.light
                        }
                    },
                    '&.MuiAlert-standardSuccess': {
                        border: `1px solid ${theme.palette.success.light}`,
                        borderWidth: mode === 'dark' ? 0 : 1,
                        '& .MuiAlert-icon': {
                            color: theme.palette.success.dark
                        }
                    }
                },
                outlined: {
                    border: '1px dashed'
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.palette.text.dark,
                    '&::placeholder': {
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    borderRadius: `${borderRadius}px`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'dark' ? theme.palette.text.primary + 28 : theme.palette.grey[400]
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.palette.primary.light
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: 'transparent',
                    padding: '15.5px 14px',
                    borderRadius: `${borderRadius}px`,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: mode === 'dark' ? theme.palette.text.primary + 50 : theme.palette.grey[300]
                    }
                },
                mark: {
                    backgroundColor: theme.palette.background.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.divider,
                    opacity: mode === 'dark' ? 0.2 : 1
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    borderBottom: '1px solid',
                    borderColor: mode === 'dark' ? theme.palette.text.primary + 20 : theme.palette.grey[200]
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: '12px 0 12px 0'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '0.8rem',
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.background.paper,
                    background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.text.primary
                },
                arrow: {
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.text.primary
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '1.25rem'
                }
            }
        }
    };
}
