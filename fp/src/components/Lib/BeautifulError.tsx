type PageErrorProps = {
  error: Error | null;
};

const PageErrorFallback = (props: PageErrorProps) => {
  const { error } = props;
  return (
    <>
      <span>{error?.message}</span>;
    </>
  );
};
export default PageErrorFallback;
