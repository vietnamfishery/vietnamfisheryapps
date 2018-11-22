interface OptionsColors {
    primary: string;
    secondary: string;
}

interface Colors {
    red: OptionsColors;
    blue: OptionsColors;
    yellow: OptionsColors;
}

export const colors: Colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};