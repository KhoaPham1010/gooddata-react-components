// (C) 2020 GoodData Corporation
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import * as numberJS from "@gooddata/numberjs";

import { FormatTemplatesDropdown, IFormatTemplate } from "./formatTemplatesDropdown/FormatTemplatesDropdown";

interface IFormatInputOwnProps {
    format: string;
    onFormatChange: (format: string) => void;
    separators: numberJS.ISeparators;
    templates?: ReadonlyArray<IFormatTemplate>;
}

type IFormatInputProps = IFormatInputOwnProps & WrappedComponentProps;

class FormatInput extends React.PureComponent<IFormatInputProps> {
    public render() {
        const { format, onFormatChange, separators, templates, intl } = this.props;
        return (
            <div className={"gd-measure-custom-format-dialog-section"}>
                <div className={"gd-measure-custom-format-dialog-section-title"}>
                    <div>{intl.formatMessage({ id: "measureNumberCustomFormatDialog.definition" })}</div>
                    {templates && (
                        <FormatTemplatesDropdown
                            onChange={onFormatChange}
                            separators={separators}
                            templates={templates}
                        />
                    )}
                </div>
                <textarea
                    className={"s-custom-format-input gd-input-field"}
                    onChange={this.handleInputChange}
                    value={format}
                />
            </div>
        );
    }

    private handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onFormatChange(e.target.value);
    };
}

const FormatInputWithIntl = injectIntl(FormatInput);

export default FormatInputWithIntl;
