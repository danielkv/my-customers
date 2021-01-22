import Image from 'next/image';
import layout from '../styles/layout.module.scss';
import LogoutButton from './logout-button';
/**
 * Component that wraps all content
 * - header
 * - footer
 */
export default function Layout({ children }) {
    return (
        <div id={layout.wrapper}>
            <header id={layout.header}>
                <Image src="/images/logo-small.png" alt="My Customers" width={216} height={35} />
                <LogoutButton />
            </header>
            <section id={layout.content}>{children}</section>
            <footer id={layout.footer}>Project My Customers</footer>
        </div>
    );
}
