'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { type CitySuggestion } from './types';

import styles from '@/styles/components/SearchBar.module.scss';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const SearchBar = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blurTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (city.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city,
          )}&limit=5&appid=${API_KEY}`,
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        } else {
          console.error('Failed to fetch city suggestions');
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [city]);

  useEffect(() => {
    return () => {
      if (blurTimerRef.current) {
        clearTimeout(blurTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/?city=${encodeURIComponent(city)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setShowSuggestions(false);

    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
    }

    const formattedCity = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;

    setCity(formattedCity);
    router.push(`/?city=${encodeURIComponent(suggestion.name)}`);
  };

  const handleBlur = () => {
    blurTimerRef.current = setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleFocus = () => {
    if (city.trim().length > 1 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit} className="position-relative">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"></span>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {showSuggestions && (
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(suggestion);
                }}
                className={styles.suggestionItem}>
                <span className="city-name">{suggestion.name}</span>
                <small className="text-muted">
                  {suggestion.state ? `${suggestion.state}, ` : ''}
                  {suggestion.country}
                </small>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};
