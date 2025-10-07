import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Download, 
  Upload, 
  Trash2, 
  Eye, 
  Edit3, 
  Database,
  FileText,
  RefreshCw,
  Copy,
  CheckCircle
} from 'lucide-react';
import { editStorage, EditableContent } from '@/lib/localStorage';

interface AdminDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ open, onOpenChange }) => {
  const { isAuthenticated } = useAdmin();
  const [content, setContent] = useState<EditableContent>({});
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'txt'>('json');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      refreshContent();
    }
  }, [open]);

  const refreshContent = () => {
    setContent(editStorage.exportEdits());
  };

  const exportContent = () => {
    const data = editStorage.exportEdits();
    
    if (exportFormat === 'json') {
      downloadFile(JSON.stringify(data, null, 2), 'admin-edits.json', 'application/json');
    } else if (exportFormat === 'csv') {
      const csv = convertToCSV(data);
      downloadFile(csv, 'admin-edits.csv', 'text/csv');
    } else {
      const txt = convertToTXT(data);
      downloadFile(txt, 'admin-edits.txt', 'text/plain');
    }
  };

  const convertToCSV = (data: EditableContent): string => {
    const rows = ['Page,Section,Field,Value'];
    
    Object.entries(data).forEach(([page, sections]) => {
      Object.entries(sections).forEach(([sectionId, fields]) => {
        Object.entries(fields).forEach(([fieldId, value]) => {
          rows.push(`"${page}","${sectionId}","${fieldId}","${value.replace(/"/g, '""')}"`);
        });
      });
    });
    
    return rows.join('\n');
  };

  const convertToTXT = (data: EditableContent): string => {
    let txt = 'Admin Edits Export\n';
    txt += '==================\n\n';
    
    Object.entries(data).forEach(([page, sections]) => {
      txt += `Page: ${page}\n`;
      txt += '-'.repeat(30) + '\n';
      
      Object.entries(sections).forEach(([sectionId, fields]) => {
        txt += `  Section: ${sectionId}\n`;
        Object.entries(fields).forEach(([fieldId, value]) => {
          txt += `    ${fieldId}: ${value}\n`;
        });
        txt += '\n';
      });
      txt += '\n';
    });
    
    return txt;
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearPage = (page: string) => {
    editStorage.clearPageEdits(page);
    refreshContent();
  };

  const clearAll = () => {
    editStorage.clearAllEdits();
    refreshContent();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getEditStats = () => {
    const pages = Object.keys(content).length;
    let sections = 0;
    let fields = 0;
    
    Object.values(content).forEach(pageContent => {
      sections += Object.keys(pageContent).length;
      Object.values(pageContent).forEach(sectionContent => {
        fields += Object.keys(sectionContent).length;
      });
    });
    
    return { pages, sections, fields };
  };

  if (!isAuthenticated) return null;

  const stats = getEditStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Admin Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.pages}</div>
                <div className="text-sm text-gray-600">Pages Edited</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.sections}</div>
                <div className="text-sm text-gray-600">Sections Modified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.fields}</div>
                <div className="text-sm text-gray-600">Fields Changed</div>
              </CardContent>
            </Card>
          </div>

          {/* Export Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export & Manage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <select 
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="txt">Text</option>
                </select>
                <Button onClick={exportContent} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export Edits
                </Button>
                <Button onClick={refreshContent} variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={clearAll} variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear All Edits
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Edited Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {Object.keys(content).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No edits recorded yet.</p>
                    <p className="text-sm">Start editing content to see changes here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(content).map(([page, sections]) => (
                      <div key={page} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Badge variant="outline">{page}</Badge>
                          </h3>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => copyToClipboard(JSON.stringify(sections, null, 2))}
                              className="gap-1"
                            >
                              {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => clearPage(page)}
                              className="gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Clear
                            </Button>
                          </div>
                        </div>
                        
                        {Object.entries(sections).map(([sectionId, fields]) => (
                          <div key={sectionId} className="ml-4 mb-3 p-3 bg-gray-50 rounded">
                            <div className="font-medium text-sm text-gray-700 mb-2">
                              Section: {sectionId}
                            </div>
                            <div className="space-y-1">
                              {Object.entries(fields).map(([fieldId, value]) => (
                                <div key={fieldId} className="flex justify-between items-start">
                                  <span className="text-sm font-medium text-gray-600 flex-1">
                                    {fieldId}:
                                  </span>
                                  <span className="text-sm text-gray-900 flex-1 ml-2 text-right break-words">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboard;
