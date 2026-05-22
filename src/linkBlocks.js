export const getScheduleStatus = (link, now = new Date()) => {
  const start = link?.scheduledStart ? new Date(link.scheduledStart) : null;
  const end = link?.scheduledEnd ? new Date(link.scheduledEnd) : null;

  if ((!start || Number.isNaN(start.getTime())) && (!end || Number.isNaN(end.getTime()))) {
    return null;
  }

  if (start && !Number.isNaN(start.getTime()) && now < start) return "scheduled";
  if (end && !Number.isNaN(end.getTime()) && now > end) return "expired";
  return "active";
};

const isGroupLink = (link) => link?.type === "group";
const isHeaderLink = (link) => link?.type === "header";
const isPinnableLink = (link) =>
  link?.pinned &&
  !link.groupId &&
  !isHeaderLink(link) &&
  !isGroupLink(link);

export const buildLinkBlocks = (links = []) => {
  const sorted = [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const blocks = [];

  const pinnedLinks = sorted.filter(isPinnableLink);
  const pinnedIds = new Set(pinnedLinks.map((link) => String(link._id)));

  if (pinnedLinks.length > 0) {
    blocks.push({ kind: "featured", links: pinnedLinks });
  }

  for (const link of sorted) {
    if (link.groupId) continue;
    if (pinnedIds.has(String(link._id))) continue;

    if (isHeaderLink(link)) {
      blocks.push({ kind: "header", link });
      continue;
    }

    if (isGroupLink(link)) {
      const children = sorted.filter(
        (child) => child.groupId && String(child.groupId) === String(link._id),
      );
      if (children.length === 0) continue;

      blocks.push({
        kind: "group",
        group: link,
        layout: link.groupLayout === "carousel" ? "carousel" : "stack",
        children,
      });
      continue;
    }

    blocks.push({ kind: "link", link });
  }

  return blocks;
};
