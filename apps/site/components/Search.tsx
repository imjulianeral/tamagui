import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Paragraph } from 'tamagui'

import { SearchContext } from './SearchContext'

const DocSearchModal = dynamic(() => import('./DocSearch'))

// const ACTION_KEY_DEFAULT = ['Ctrl ', 'Control']
// const ACTION_KEY_APPLE = ['⌘', 'Command']
const API_KEY = '10e7bbeb85d3909346e1519bfcdf82dc'
const APP_ID = 'AIE0I4P8ZS'
const INDEX = 'tamagui'

export const SearchProvider = memo(({ children }: any) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState(null)

  const onInput = useCallback(
    (e: any) => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery]
  )
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen])
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen])

  useSearchKeyboard({
    isOpen,
    onOpen,
    onClose,
    onInput,
  })

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
      onInput,
    }),
    [isOpen, onOpen, onClose, onInput]
  )

  return (
    <>
      <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
      {isOpen &&
        createPortal(
          <DocSearchModal
            placeholder="Search docs..."
            hitComponent={ResultItem}
            searchParameters={{
              // facetFilters: ['version:1.0.0'],
              facetFilters: [],
              distinct: 1,
            }}
            initialQuery={initialQuery || ''}
            initialScrollY={window.scrollY}
            onClose={onClose}
            appId={APP_ID}
            apiKey={API_KEY}
            indexName={INDEX}
            navigator={{
              navigate({ itemUrl }) {
                setIsOpen(false)
                router.push(itemUrl)
              },
            }}
            transformItems={(items) => {
              return items.map((item, index) => {
                const aEl = document.createElement('a')
                aEl.href = item.url
                const hash = aEl.hash
                return {
                  ...item,
                  url: `${aEl.pathname}${hash}`,
                  isResult: () => true,
                  isParent: () => item.type === 'lvl1' && items.length > 1 && index === 0,
                  isChild: () =>
                    items.length > 1 &&
                    items[0].type === 'lvl1' &&
                    item.type !== 'lvl1' &&
                    index !== 0,
                  isFirst: () => index === 1,
                  isLast: () => index === items.length - 1 && index !== 0,
                }
              })
            }}
          />,
          document.body
        )}
    </>
  )
})

const ResultItem = ({ hit, children }) => {
  return (
    <NextLink legacyBehavior href={hit.url}>
      <Paragraph tag="a">{children}</Paragraph>
    </NextLink>
  )
}

const useSearchKeyboard = ({ isOpen, onOpen, onClose }: any) => {
  useEffect(() => {
    const onKeyDown = (event: any) => {
      function open() {
        if (!document.body.classList.contains('DocSearch--active')) {
          onOpen()
        }
      }
      if (
        (isOpen && event.keyCode === 27) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isFocusedSomewhere(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault()

        if (isOpen) {
          onClose()
        } else if (!document.body.classList.contains('DocSearch--active')) {
          open()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpen, onClose])
}

const isFocusedSomewhere = (event: any) => {
  const element = event.target
  const tagName = element.tagName
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}