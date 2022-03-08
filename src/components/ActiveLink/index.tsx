import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}
/**
 * De maneira supercial falando, "cloneElement" é uma forma nativa do React em passar uma propriedade em cima de uma propriedade.
 */

export function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === props.href ? activeClassName : '';

    return (
        <Link {...props}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    )
}