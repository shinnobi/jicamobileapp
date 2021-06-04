import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { colorSet, fontSizeSet } from '../../AppStyles';
import { Icon as MaterialCommunityIcons, IconIO, IconMI } from '../../utils/Omni';

class Icon extends PureComponent {
    render(){
        const { name, color, size, style } = this.props;
        const seperatorIndex = name.indexOf('_');
        const iconKey = seperatorIndex >= 0 ? name.substring(0, seperatorIndex) : '';
        const convertedIcon =
            iconKey === 'io' || iconKey === 'mi' ? name.substring(seperatorIndex + 1): name;
        const componentName = 
            iconKey === 'io' ? IconIO : iconKey === 'mi' ? IconMI : MaterialCommunityIcons;

        return React.createElement (componentName, {
            name: convertedIcon,
            style: [
                styles.icon,
                style && style,
                {
                    color: color || colorSet.activeColor,
                    fontWeight: 'bold',
                    // width: size || Styles.IconSize.ToolBar,
                    // height: size || Styles.IconSize.ToolBar,
                },
                size && { fontSize: size || fontSizeSet.xlarge },
            ],
        });
    }
}

const styles = StyleSheet.create({
    icon: {
        opacity: 1,
    },
});

export default Icon;