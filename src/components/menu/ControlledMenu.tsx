// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import { OpenAction, IMenuPositionConfig } from './MenuSharedTypes';
import MenuOpener from './menuOpener/MenuOpener';

export interface IControlledMenuProps extends Partial<IMenuPositionConfig> {
    opened: boolean;
    openAction?: OpenAction;
    closeOnScroll: boolean;
    portalTarget: Element;
    onOpenedChange: (opened: boolean) => void;
    toggler: React.ReactNode;
    children: React.ReactNode;
}

export default class ControlledMenu extends React.Component<IControlledMenuProps> {
    public componentDidMount() {
        if (this.props.closeOnScroll) {
            this.addScrollListeners();
        }
    }

    public componentWillUnmount() {
        if (this.props.closeOnScroll) {
            this.removeScrollListeners();
        }
    }

    public componentDidUpdate(prevProps: IControlledMenuProps) {
        if (prevProps.closeOnScroll !== this.props.closeOnScroll) {
            if (this.props.closeOnScroll) {
                this.addScrollListeners();
            } else {
                this.removeScrollListeners();
            }
        }
    }

    public render() {
        return (
            <MenuOpener
                opened={this.props.opened}
                onOpenedChange={this.props.onOpenedChange}
                openAction={this.props.openAction}
                alignment={this.props.alignment}
                spacing={this.props.spacing}
                offset={this.props.offset}
                portalTarget={this.props.portalTarget}
                toggler={this.props.toggler}
                topLevelMenu={true}
            >
                {this.props.children}
            </MenuOpener>
        );
    }

    private closeMenu = () => {
        this.props.onOpenedChange(false);
    };

    private addScrollListeners = () => {
        window.addEventListener('scroll', this.closeMenu, true);
    };

    private removeScrollListeners = () => {
        window.removeEventListener('scroll', this.closeMenu, true);
    }
}
