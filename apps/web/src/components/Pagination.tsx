const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({ page, limit, total, onPageChange, onLimitChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  const hasMultiplePages = total > limit;

  const visibleOptions = [
    ...PAGE_SIZE_OPTIONS.filter((opt) => opt < total),
    total,
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
      {hasMultiplePages && (
        <>
          <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            ← Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              disabled={p === page}
              style={
                p === page
                  ? {
                      backgroundColor: 'var(--color-background-inverse)',
                      color: 'var(--color-text-on-inverse)',
                      border: 'none',
                      borderRadius: 'var(--radius-200)',
                      padding: '0.25rem 0.6rem',
                      fontWeight: 'bold',
                    }
                  : { fontWeight: 'normal' }
              }
            >
              {p}
            </button>
          ))}

          <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            Siguiente →
          </button>
        </>
      )}

      <label style={{ marginLeft: hasMultiplePages ? '1rem' : undefined }}>
        Por página:&nbsp;
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          {visibleOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
