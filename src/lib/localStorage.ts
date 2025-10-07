/**
 * Local Storage Manager for Admin Edit Mode
 * Manages all editable content changes locally without modifying source files
 */

export interface EditableContent {
  [page: string]: {
    [sectionId: string]: {
      [fieldId: string]: string;
    };
  };
}

class EditModeStorage {
  private storageKey = 'sudbury-admin-edits';

  // Get all edited content
  getContent(): EditableContent {
    try {
      const content = localStorage.getItem(this.storageKey);
      return content ? JSON.parse(content) : {};
    } catch {
      return {};
    }
  }

  // Set content for a specific field
  setContent(page: string, sectionId: string, fieldId: string, value: string) {
    const content = this.getContent();
    
    if (!content[page]) content[page] = {};
    if (!content[page][sectionId]) content[page][sectionId] = {};
    
    content[page][sectionId][fieldId] = value;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(content));
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  }

  // Get content for a specific field, fallback to default
  getFieldContent(page: string, sectionId: string, fieldId: string, defaultValue: string = ''): string {
    const content = this.getContent();
    return content[page]?.[sectionId]?.[fieldId] || defaultValue;
  }

  // Get all edited content for a section
  getSectionContent(page: string, sectionId: string): Record<string, string> {
    const content = this.getContent();
    return content[page]?.[sectionId] || {};
  }

  // Clear all edits
  clearAllEdits() {
    localStorage.removeItem(this.storageKey);
  }

  // Clear edits for a specific page
  clearPageEdits(page: string) {
    const content = this.getContent();
    delete content[page];
    localStorage.setItem(this.storageKey, JSON.stringify(content));
  }

  // Export all edits (for debugging)
  exportEdits() {
    return this.getContent();
  }
}

export const editStorage = new EditModeStorage();
