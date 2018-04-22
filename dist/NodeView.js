/* @flow */
import isEqual from 'lodash.isequal';
import * as React from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
export default class NodeView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onNodePressed = () => {
            this.setState({
                node: Object.assign({}, this.state.node, { opened: (this.props.closeOnPress && this.props.closeOnPress(this.state.node)) ? !this.state.node.opened : this.state.node.opened }),
            });
            if (this.props.onNodePressed) {
                this.props.onNodePressed(this.state.node);
            }
        };
        this.renderChildren = (item, level) => {
            return (<NodeView getChildrenName={this.props.getChildrenName} node={item} level={level + 1} onNodePressed={this.props.onNodePressed} renderNode={this.props.renderNode}/>);
        };
        this.renderItem = ({ item }) => this.renderChildren(item, this.props.level);
    }
    componentWillMount() {
        this.setState({
            node: Object.assign({ opened: false }, this.props.node),
        });
    }
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.node, nextProps.node)) {
            this.setState({
                node: Object.assign({ opened: false }, nextProps.node),
            });
        }
    }
    render() {
        const rootChildrenName = this.props.getChildrenName(this.state.node);
        const rootChildren = this.state.node[rootChildrenName];
        return (<View>
        {!this.state.node.hidden ? (<TouchableWithoutFeedback onPress={this.onNodePressed}>
            <View>
              {this.props.renderNode(this.state.node, this.props.level)}
            </View>
          </TouchableWithoutFeedback>) : null}
        {this.state.node.opened && rootChildren ? (<FlatList data={rootChildren} renderItem={this.renderItem} keyExtractor={(item) => item._internalId}/>) : null}
      </View>);
    }
}
//# sourceMappingURL=NodeView.js.map
