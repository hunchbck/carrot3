export default function HomeLayout({
  children,
  modal,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode,
  // eslint-disable-next-line no-undef
  modal: React.ReactNode,
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
