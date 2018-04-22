/// <reference types="react" />
import * as React from 'react';
export interface INode {
    _internalId: string;
    hidden: boolean;
    opened: boolean;
    [key: string]: any;
}
export interface IProps {
    generateIds?: (node?: INode) => any;
    getChildren?: () => any;
    getChildrenName: (item: INode) => any;
    node: INode;
    level: number;
    onNodePressed?: (item: any) => any;
    renderNode: (item: any, level: number) => any;
    renderChildrenNode?: (item: any) => any;
}
export interface IState {
    node: INode;
}
export default class NodeView extends React.PureComponent<IProps, IState> {
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: IProps): void;
    onNodePressed: () => void;
    renderChildren: (item: INode, level: number) => any;
    renderItem: ({ item }: {
        item: INode;
    }) => any;
    render(): JSX.Element;
}
