import React = require("react")
import _ = require("lodash")
import {stringIf} from "../util"

/*
export function createDivComponent(className: string) {
    return (props: React.HTMLProps<HTMLDivElement>) => {
        return <div {...props} className={className + stringIf(!!props.className, " " + props.className)}>
            {props.children}
        </div>
    }
}
*/

export function createDivComponent(className: string) {
    return createSimpleComponent<HTMLDivElement>("div", className)
}

export function createSimpleComponent<T>(elementType: string, className: string) {
    return (props: React.HTMLProps<T>) => {
        return React.createElement(
            elementType, 
            _.assign(
                {},
                props, 
                {className: className + stringIf(!!props.className, " " + props.className)}
            )
        )
    }
}

export const panel = {
    Panel: createDivComponent("ulterius-panel"),
    Header: createDivComponent("header"),
    HeaderCenter: createDivComponent("header-center"),
    Fixed: createDivComponent("fixed"),
    FixedCenter: createDivComponent("fixed-center"),
    Flex: createDivComponent("flexible"),
    FlexFixed: createDivComponent("flex-fixed")
}

export const Panel = createDivComponent("ulterius-panel")
export const FlexRow = createDivComponent("flex-row")
export const FlexCol = createDivComponent("flex-col")

export function Meter() {
    return <svg viewBox="0 0 100 75">
        <path d="M25 40 C 35 20 65 20 75 40" style={{strokeWidth: 20}} stroke="black" fill="transparent"/>
    </svg>
}
