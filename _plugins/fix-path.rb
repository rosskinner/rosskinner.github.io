module Jekyll
  module FixPath

    def check_asset_path (input)
      str = input.strip

      if str.index('/assets') == nil
        page = @context.environments.first["page"]
        url = page["url"]
        if url
          # inject the current page url as path for the input
          return File.join(url, str.gsub('./', ''))
        end
      end

      # return the same value if the input has /assets
      str
    end

    def fixpath (input)
      if input.instance_of? Array
        return input.map { |a| check_asset_path(a) }
      end
      check_asset_path(input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::FixPath)
