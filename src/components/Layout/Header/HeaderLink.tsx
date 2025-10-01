import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type HeaderLinkButtonProps = {
  url: string;
  testId: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

const HeaderLink: React.FC<HeaderLinkButtonProps> = ({
  url,
  testId,
  label,
  children,
  className,
}) => {
  const location = useLocation();

  return (
    <Link
      to={url}
      className={
        className ||
        `flex rounded-md px-1.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm ${
          location.pathname === url
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
      data-testid={testId}
    >
      {children || label}
    </Link>
  );
};

export default HeaderLink;
