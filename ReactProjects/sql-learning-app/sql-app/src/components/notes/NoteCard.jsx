import { useState } from 'react';
import { Edit2, Trash2, Bookmark, MoreVertical, Eye, Tag, Folder, Clock } from 'lucide-react';

const NoteCard = ({ note, onSelect, onEdit, onDelete, onToggleFavorite, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getContentPreview = (content) => {
    // Remove markdown syntax for preview
    const plainText = content
      .replace(/#{1,6}\s?/g, '') // Remove headings
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italics
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, 'code') // Replace code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Replace links
    
    return plainText.substring(0, 120) + (plainText.length > 120 ? '...' : '');
  };

  if (viewMode === 'list') {
    return (
      <div className="note-list-item">
        <div className="list-item-left">
          <div 
            className="note-color-indicator"
            style={{ backgroundColor: note.color }}
          />
          <div className="note-info">
            <div className="note-header">
              <h4 onClick={() => onSelect(note)} className="note-title">
                {note.title}
              </h4>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(note.id);
                }}
                className={`favorite-btn ${note.isFavorite ? 'active' : ''}`}
                title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Bookmark size={14} />
              </button>
            </div>
            
            <div className="note-meta">
              <span className="meta-item">
                <Folder size={12} />
                {note.folder}
              </span>
              <span className="meta-item">
                <Clock size={12} />
                {formatDate(note.updatedAt)}
              </span>
            </div>
            
            <p className="note-preview">
              {getContentPreview(note.content)}
            </p>
            
            <div className="note-tags">
              {note.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="tag-more">+{note.tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="list-item-right">
          <div className="action-menu">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }} 
              className="menu-toggle"
            >
              <MoreVertical size={18} />
            </button>
            
            {showMenu && (
              <div className="action-menu-dropdown">
                <button onClick={() => onSelect(note)} className="menu-item">
                  <Eye size={14} />
                  View
                </button>
                <button onClick={() => onEdit(note)} className="menu-item">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button onClick={() => onDelete(note.id)} className="menu-item delete">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div className="card-header">
        <div 
          className="note-color"
          style={{ backgroundColor: note.color }}
        />
        <div className="card-actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(note.id);
            }}
            className={`favorite-btn ${note.isFavorite ? 'active' : ''}`}
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Bookmark size={16} />
          </button>
          
          <div className="action-menu">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }} 
              className="menu-toggle"
            >
              <MoreVertical size={18} />
            </button>
            
            {showMenu && (
              <div className="action-menu-dropdown">
                <button onClick={() => onSelect(note)} className="menu-item">
                  <Eye size={14} />
                  View
                </button>
                <button onClick={() => onEdit(note)} className="menu-item">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button onClick={() => onDelete(note.id)} className="menu-item delete">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="card-body" onClick={() => onSelect(note)}>
        <h4 className="note-title">{note.title}</h4>
        <p className="note-preview">
          {getContentPreview(note.content)}
        </p>
        
        <div className="note-meta">
          <span className="meta-item">
            <Folder size={12} />
            {note.folder}
          </span>
          <span className="meta-item">
            <Clock size={12} />
            {formatDate(note.updatedAt)}
          </span>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="note-tags">
          {note.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="tag-more">+{note.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;