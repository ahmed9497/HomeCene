type tParams = Promise<{ slug: string[] }>;

export default async function ShopPage({ params }: { params: tParams }) {
  const { slug } = await params;

  return (<div>{slug}</div>)
}
