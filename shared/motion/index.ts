// Motion system simplificado: solo utilidades de scroll programático
export * from './scrollers/scrollAnimations';

// No-op stub (legacy compatibility) – se puede eliminar en próximo sprint
export const useFooterReveal = () => ({
	rootRef: { current: null },
	titleRef: { current: null },
	linksRef: { current: null },
	bottomRef: { current: null }
});
