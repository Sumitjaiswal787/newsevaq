import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:async';
import '../theme.dart';
import '../providers/location_provider.dart';
import 'package:flutter_house_help/models/location.dart' as models;

// ─── Location Selection Dialog ─────────────────────────────────────────────
// Redesigned to comply with the Sevaq Design System.
// Clean typography, soft colors, and balanced margins.
// ──────────────────────────────────────────────────────────────────────────

class LocationPickerDialog extends StatefulWidget {
  final LocationProvider locationProvider;

  const LocationPickerDialog({super.key, required this.locationProvider});

  @override
  State<LocationPickerDialog> createState() => _LocationPickerDialogState();
}

class _LocationPickerDialogState extends State<LocationPickerDialog> {
  final TextEditingController _searchController = TextEditingController();
  Timer? _debounceTimer;
  List<models.Location> _searchResults = [];
  bool _isSearching = false;
  String? _errorMessage;

  @override
  void dispose() {
    _debounceTimer?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _searchLocations(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
        _errorMessage = null;
      });
      return;
    }

    _debounceTimer?.cancel();
    _debounceTimer = Timer(const Duration(milliseconds: 300), () async {
      if (!mounted) return;
      setState(() {
        _isSearching = true;
        _errorMessage = null;
      });

      try {
        final results = await widget.locationProvider.searchLocations(query);
        if (!mounted) return;
        setState(() {
          _searchResults = results.cast<models.Location>();
          _isSearching = false;
        });
      } catch (e) {
        if (!mounted) return;
        setState(() {
          _errorMessage = 'Failed to search locations. Please try again.';
          _isSearching = false;
          _searchResults = [];
        });
      }
    });
  }

  void _selectLocation(models.Location location) {
    widget.locationProvider.setManualLocation(location);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final locationProvider = widget.locationProvider;

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      backgroundColor: AppTheme.fogWhite,
      surfaceTintColor: Colors.transparent,
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxHeight: MediaQuery.of(context).size.height * 0.8,
          maxWidth: MediaQuery.of(context).size.width * 0.9,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
              child: Row(
                children: [
                  const Icon(
                    Icons.location_on,
                    color: AppTheme.emeraldGreen,
                    size: 26,
                  ),
                  const SizedBox(width: 12),
                  const Text(
                    'Select Location',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.charcoalBlack,
                      letterSpacing: -0.3,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    style: IconButton.styleFrom(
                      backgroundColor: AppTheme.stoneGray.withOpacity(0.4),
                      minimumSize: const Size(36, 36),
                      padding: EdgeInsets.zero,
                    ),
                    icon: const Icon(
                      Icons.close,
                      color: AppTheme.charcoalBlack,
                      size: 18,
                    ),
                  ),
                ],
              ),
            ),

            // Search Field
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: TextField(
                controller: _searchController,
                cursorColor: AppTheme.emeraldGreen,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                  color: AppTheme.charcoalBlack,
                ),
                decoration: InputDecoration(
                  hintText: 'Search for a location...',
                  hintStyle: TextStyle(
                    color: AppTheme.secondaryText.withOpacity(0.8),
                    fontSize: 14,
                  ),
                  prefixIcon: const Icon(
                    Icons.search,
                    color: AppTheme.secondaryText,
                    size: 20,
                  ),
                  suffixIcon: _searchController.text.isNotEmpty
                      ? IconButton(
                          icon: const Icon(
                            Icons.clear,
                            color: AppTheme.secondaryText,
                            size: 18,
                          ),
                          onPressed: () {
                            _searchController.clear();
                            _searchLocations('');
                          },
                        )
                      : null,
                  filled: true,
                  fillColor: Colors.white,
                  hoverColor: Colors.transparent,
                  focusColor: Colors.transparent,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 14,
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: const BorderSide(
                      color: AppTheme.stoneGray,
                      width: 1.0,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: const BorderSide(
                      color: AppTheme.emeraldGreen,
                      width: 1.5,
                    ),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                onChanged: _searchLocations,
              ),
            ),

            const SizedBox(height: 20),

            // Content Area
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Current Location Section
                    if (locationProvider.currentLocationData != null) ...[
                      const Text(
                        'Current Location',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.emeraldGreen,
                          letterSpacing: 0.1,
                        ),
                      ),
                      const SizedBox(height: 8),
                      _LocationTile(
                        location: locationProvider.currentLocationData!,
                        onTap: () => _selectLocation(
                          locationProvider.currentLocationData!,
                        ),
                        isCurrent: true,
                      ),
                      const SizedBox(height: 20),
                    ],

                    // Recent Locations Section
                    if (locationProvider.recentLocations.isNotEmpty) ...[
                      const Text(
                        'Recent Locations',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.charcoalBlack,
                          letterSpacing: 0.1,
                        ),
                      ),
                      const SizedBox(height: 8),
                      ...locationProvider.recentLocations.map(
                        (location) => _LocationTile(
                          location: location,
                          onTap: () => _selectLocation(location),
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],

                    // Search Results Section
                    if (_searchController.text.isNotEmpty) ...[
                      const Text(
                        'Search Results',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.charcoalBlack,
                          letterSpacing: 0.1,
                        ),
                      ),
                      const SizedBox(height: 8),
                      if (_isSearching)
                        const Center(
                          child: Padding(
                            padding: EdgeInsets.all(24),
                            child: CircularProgressIndicator(
                              color: AppTheme.emeraldGreen,
                              strokeWidth: 2.5,
                            ),
                          ),
                        )
                      else if (_errorMessage != null)
                        Center(
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Text(
                              _errorMessage!,
                              style: const TextStyle(
                                fontSize: 13,
                                color: AppTheme.errorColor,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        )
                      else if (_searchResults.isEmpty)
                        const Center(
                          child: Padding(
                            padding: EdgeInsets.all(24),
                            child: Text(
                              'No locations found',
                              style: TextStyle(
                                fontSize: 13,
                                color: AppTheme.secondaryText,
                              ),
                            ),
                          ),
                        )
                      else
                        ..._searchResults.map(
                          (location) => _LocationTile(
                            location: location,
                            onTap: () => _selectLocation(location),
                          ),
                        ),
                    ],
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class _LocationTile extends StatelessWidget {
  final models.Location location;
  final VoidCallback onTap;
  final bool isCurrent;

  const _LocationTile({
    required this.location,
    required this.onTap,
    this.isCurrent = false,
  });

  // Extract clean subline to avoid repetition
  String _cleanSubline() {
    final city = location.city ?? '';
    final state = location.state ?? '';
    if (city.isEmpty && state.isEmpty) return 'Uttar Pradesh';
    if (city.isEmpty) return state;
    if (state.isEmpty) return city;
    if (city.toLowerCase() == state.toLowerCase()) return city;
    return '$city, $state';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isCurrent
              ? AppTheme.emeraldGreen.withOpacity(0.5)
              : AppTheme.stoneGray,
          width: isCurrent ? 1.5 : 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          onTap: onTap,
          splashColor: AppTheme.softGreen,
          highlightColor: AppTheme.softGreen.withOpacity(0.5),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Row(
              children: [
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: isCurrent ? AppTheme.softGreen : AppTheme.fogWhite,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    isCurrent ? Icons.my_location : Icons.location_on_outlined,
                    color: isCurrent ? AppTheme.emeraldGreen : AppTheme.secondaryText,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        location.address,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppTheme.charcoalBlack,
                          height: 1.25,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        _cleanSubline(),
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w400,
                          color: AppTheme.secondaryText,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                const Icon(
                  Icons.arrow_forward_ios_rounded,
                  color: AppTheme.secondaryText,
                  size: 14,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
