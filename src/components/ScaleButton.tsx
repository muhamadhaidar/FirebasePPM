import React, { useState, useEffect, useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle, Platform } from 'react-native';

interface ScaleButtonProps extends PressableProps {
    scaleAmount?: number;
    hoverScaleAmount?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

// Create an animated component for Pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ScaleButton: React.FC<ScaleButtonProps> = ({
    children,
    scaleAmount = 0.95,
    hoverScaleAmount = 1.05,
    style,
    ...props
}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let targetScale = 1;

        if (isPressed) {
            targetScale = scaleAmount;
        } else if (isHovered) {
            targetScale = hoverScaleAmount;
        }

        Animated.spring(scaleValue, {
            toValue: targetScale,
            useNativeDriver: true,
            speed: 300,
            bounciness: 12,
        }).start();

    }, [isPressed, isHovered, scaleAmount, hoverScaleAmount]);

    return (
        <AnimatedPressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style={[
                style,
                { transform: [{ scale: scaleValue }] }
            ]}
            {...props}
        >
            {children}
        </AnimatedPressable>
    );
};

export default ScaleButton;
