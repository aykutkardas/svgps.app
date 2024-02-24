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
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const itemsPerPage = 60;

  const currentPage = parseInt(page || "1");

  const searchQuery = `%${query}%`;

  const { count } = await supabase
    .from("icons")
    .select("*", { count: "exact" })
    .ilike("name", searchQuery);

  const totalPage = Math.ceil((count || 0) / itemsPerPage);

  const offset = (currentPage - 1) * itemsPerPage;

  const { data, error } = await supabase
    .from("icons")
    .select("*")
    .ilike("name", searchQuery)
    .range(offset, offset + itemsPerPage - 1);

  if (error) {
    return Response.error();
  }

  const icons = normalize(data);

  return Response.json({
    icons,
    query,
    page,
    count,
    totalPage,
  });
}
