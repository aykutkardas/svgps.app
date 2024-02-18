import supabase from "src/utils/supabase";

const normalize = (data) => {
  return data.map((icon) => ({
    ...icon,
    icon: JSON.parse(icon.icon.replaceAll("'", '"')),
    properties: JSON.parse(icon.properties.replaceAll("'", '"')),
  }));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const page = searchParams.get("page");

  const itemsPerPage = 500;

  const currentPage = parseInt(page || "1");

  const { count } = await supabase
    .from("icons")
    .select("*", { count: "exact" })
    .eq("iconSetName", slug);

  const totalPage = Math.ceil((count || 0) / itemsPerPage);

  const offset = (currentPage - 1) * itemsPerPage; // Fix: Multiply currentPage by itemsPerPage

  const { data, error } = await supabase
    .from("icons")
    .select("*")
    .eq("iconSetName", slug)
    .range(offset, offset + itemsPerPage - 1); // Fix: Use itemsPerPage instead of totalPage

  if (error) {
    return Response.error();
  }

  const icons = normalize(data);

  return Response.json({
    icons,
    slug,
    page,
    count,
    totalPage,
  });
}
