import React from 'react';
type DynamicHtmlContentProps = {
    htmlContent: string; 
};
const DynamicHtmlContent: React.FC<DynamicHtmlContentProps> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default DynamicHtmlContent;