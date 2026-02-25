import type { ToolMetadata, ToolSortOption, ToolCategory } from '../types/tools';
import { getCategoryById } from '../constants/categories';

export interface ToolFilterOptions {
  search?: string;
  categories?: ToolCategory[];
  tags?: string[];
  sortBy?: ToolSortOption;
}

/**
 * Filters tools based on search query, categories, and tags
 */
export function filterTools(
  tools: ToolMetadata[],
  options: ToolFilterOptions
): ToolMetadata[] {
  let filtered = [...tools];

  // Filter by search query
  if (options.search) {
    const query = options.search.toLowerCase();
    filtered = filtered.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter by categories
  if (options.categories && options.categories.length > 0) {
    filtered = filtered.filter((tool) => options.categories!.includes(tool.category as ToolCategory));
  }

  // Filter by tags
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter((tool) =>
      options.tags!.some((tag) => tool.tags?.includes(tag))
    );
  }

  // Sort tools
  if (options.sortBy) {
    filtered = sortTools(filtered, options.sortBy);
  }

  return filtered;
}

/**
 * Sorts tools based on the specified option
 */
export function sortTools(
  tools: ToolMetadata[],
  sortBy: ToolSortOption
): ToolMetadata[] {
  const sorted = [...tools];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'popular':
      // For now, sort by name as we don't have usage data
      // In the future, this could sort by actual usage metrics
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'recent':
      // Sort new tools first, then by name
      return sorted.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return a.name.localeCompare(b.name);
      });
    default:
      return sorted;
  }
}

/**
 * Finds related tools based on category and tags
 */
export function findRelatedTools(
  currentTool: ToolMetadata,
  allTools: ToolMetadata[],
  limit: number = 4
): ToolMetadata[] {
  // Filter out the current tool
  const otherTools = allTools.filter((tool) => tool.id !== currentTool.id);

  // Score each tool based on similarity
  const scoredTools = otherTools.map((tool) => {
    let score = 0;

    // Same category gets highest score
    if (tool.category === currentTool.category) {
      score += 10;
    }

    // Shared tags increase score
    if (currentTool.tags && tool.tags) {
      const sharedTags = currentTool.tags.filter((tag) => tool.tags!.includes(tag));
      score += sharedTags.length * 2;
    }

    return { tool, score };
  });

  // Sort by score and return top results
  return scoredTools
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.tool);
}

/**
 * Gets related tools - accepts either a tool object or tool ID string
 * This provides backward compatibility with existing tool pages
 */
export function getRelatedTools(
  currentToolOrId: ToolMetadata | string,
  allTools: ToolMetadata[],
  limit: number = 4
): ToolMetadata[] {
  // If a string ID is passed, find the tool object
  let currentTool: ToolMetadata | undefined;
  
  if (typeof currentToolOrId === 'string') {
    currentTool = allTools.find((t) => t.id === currentToolOrId);
    if (!currentTool) {
      console.error(`Tool not found: ${currentToolOrId}`);
      return [];
    }
  } else {
    currentTool = currentToolOrId;
  }

  return findRelatedTools(currentTool, allTools, limit);
}

/**
 * Gets the full path for a tool including category
 */
export function getToolPath(toolId: string, allTools: ToolMetadata[]): string {
  const tool = allTools.find((t) => t.id === toolId);
  if (!tool) {
    console.error(`Tool not found: ${toolId}`);
    return `/tools/${toolId}`;
  }

  const category = getCategoryById(tool.category);
  if (!category) {
    console.error(`Category not found for tool: ${toolId}`);
    return `/tools/${toolId}`;
  }

  return `/tools/${category.id}/${tool.id}`;
}

/**
 * Gets a tool by its ID
 */
export function getToolById(toolId: string, allTools: ToolMetadata[]): ToolMetadata | undefined {
  return allTools.find((tool) => tool.id === toolId);
}
